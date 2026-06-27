using FormaFantasia.Web.Models;
using Microsoft.AspNetCore.Identity;

namespace FormaFantasia.Web.Data;
// Injetar dados iniciais na BD
public static class SeedData
{
    public static async Task InicializarAsync(IServiceProvider serviceProvider)
    {
        // Permissoes de sistema e gestores
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = serviceProvider.GetRequiredService<UserManager<Utilizador>>();

        // Criar roles se não existirem
        string[] roles = { "Admin", "Cliente" };
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));
        }

        // Criar utilizador Admin se não existir
        var adminEmail = "admin@formafantasia.pt";
        if (await userManager.FindByEmailAsync(adminEmail) == null)
        {
            var admin = new Utilizador
            {
                UserName = adminEmail,
                Email = adminEmail,
                Morada = "Rua da Fantasia, 1",
                NIF = "123456789",
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(admin, "Admin@123456");
            if (result.Succeeded)
                await userManager.AddToRoleAsync(admin, "Admin");
        }
    }
}