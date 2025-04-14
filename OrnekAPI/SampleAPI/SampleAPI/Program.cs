using Microsoft.EntityFrameworkCore;
using SampleAPI.ApplicationDbContexts;
using SampleAPI.DTOs;
using SampleAPI.Models;
using Scalar.AspNetCore;
using TS.Result;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDbContext>(x => x.UseInMemoryDatabase("FirstDb"));
builder.Services.AddCors();

builder.Services.AddControllers();

builder.Services.AddOpenApi();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    SampleData(context);

}

app.MapOpenApi();
app.MapScalarApiReference();

app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin().SetPreflightMaxAge(TimeSpan.FromMinutes(60)));

#region Account
app.MapPost("/login", async (LoginDTO request, AppDbContext context, CancellationToken token) =>
{
    var user = await context.Users
        .FirstOrDefaultAsync(u => u.Email == request.Email && u.Password == request.Password, token);

    if (user == null)
    {
        return Results.BadRequest(Result<string>.Failure("Geçersiz email veya þifre!"));
    }

    return Results.Ok(Result<string>.Succeed("Giriþ baþarýlý"));
});

app.MapPost("/register", async (RegisterDTO request, AppDbContext context, CancellationToken token) =>
{
    var user = await context.Users.FirstOrDefaultAsync(x => x.Email == request.Email);
    if (user != null)
    {
        return Results.BadRequest(new { Error = "Bu E-posta adresi zaten kullanýlýyor." });
    }

    if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Password))
    {
        return Results.BadRequest(new { Success = false, Error = "Bilgileri eksiksiz doldurun." });
    }

    var newUser = new User { Email = request.Email, Name = request.Name, Password = request.Password };
    context.Add(newUser);

    await context.SaveChangesAsync(token);
    return Results.Ok();
});
#endregion

#region Product
app.MapGet("/product", async (AppDbContext contex, CancellationToken token) =>
{
    var product = await contex.Products.ToListAsync(token);
    return Results.Ok(product);
});

app.MapDelete("/product/delete/{id}", async (AppDbContext context, CancellationToken token, Guid id) =>
{
    var product = await context.Products.FindAsync(id, token);

    if (product == null)
    {
        return Results.NotFound();
    }

    context.Remove(product);
    await context.SaveChangesAsync(token);
    return Results.Ok(Result<string>.Succeed("Ürün baþarýyla silindi"));
});

app.MapPut("/product/update/{id}", async (Guid id, AppDbContext context, CancellationToken token, UpdateProductDTO request) =>
{
    var product = await context.Products.FirstOrDefaultAsync(x => x.Id == id, token);
    if (product == null)
    {
        return Results.NotFound(Result<string>.Failure("Ürün bulunamadý"));
    }

    product.Name = request.Name;
    product.Description = request.Description;
    product.Price = request.Price;
    context.Products.Update(product);
    await context.SaveChangesAsync(token);

    return Results.Ok(Result<string>.Succeed("Ürün baþarýyla güncellendi"));
});
app.MapPost("/product/add", async (CreateProductDTO request, AppDbContext context, CancellationToken token) =>
{
    var product = new Product { Name = request.Name, Description = request.Description, Price = request.Price };
    context.Products.Add(product);
    await context.SaveChangesAsync(token);
    return Results.Ok(Result<string>.Succeed("Ürün baþarýyla kaydedili"));
}

);
#endregion

app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        var result = Result<string>.Failure(ex.Message);
        context.Response.StatusCode = 500;
        await context.Response.WriteAsJsonAsync(result);
    }
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();


void SampleData(AppDbContext context)
{
    if (!context.Users.Any())
    {
        context.Users.AddRange(
            new User { Email = "user1@example.com", Name = "User1", Password = "password1" },
            new User { Email = "user2@example.com", Name = "User2", Password = "password2" }
        );
    }

    if (!context.Products.Any())
    {
        context.Products.AddRange(
             new Product { Name = "Laptop", Description = "Yüksek performanslý laptop", Price = 1500m },
             new Product { Name = "Smartphone", Description = "Son teknoloji akýllý telefon", Price = 800m },
             new Product { Name = "Tablet", Description = "Eðitim ve eðlence için ideal tablet", Price = 500m }
         );
        context.SaveChanges();
    }
}