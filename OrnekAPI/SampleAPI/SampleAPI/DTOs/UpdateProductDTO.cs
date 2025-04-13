namespace SampleAPI.DTOs
{
    public class UpdateProductDTO
    {
        public Guid Id { get; set; }=default!;
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public decimal Price { get; set; } = default!;
    }
}
