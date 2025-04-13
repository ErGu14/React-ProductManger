namespace SampleAPI.Models
{
    public class User
    {
        public User()
        {
            Id = Guid.CreateVersion7();
        }
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
    }
}
