#nullable disable
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using FormaFantasia.Web.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace FormaFantasia.Web.Areas.Identity.Pages.Account
{
    public class LoginModel : PageModel
    {
        private readonly SignInManager<Utilizador> _signInManager;
        private readonly ILogger<LoginModel> _logger;

        public LoginModel(SignInManager<Utilizador> signInManager, ILogger<LoginModel> logger)
        {
            _signInManager = signInManager;
            _logger = logger;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }
        public string ReturnUrl { get; set; }

        [TempData]
        public string ErrorMessage { get; set; }

        public class InputModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            [Display(Name = "Remember me?")]
            public bool RememberMe { get; set; }
        }

        public async Task<IActionResult> OnGetAsync(string returnUrl = null)
        {
            returnUrl ??= "/pages/index.html";
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
            return LocalRedirect($"/pages/login.html?redirect={Uri.EscapeDataString(returnUrl)}");
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl ??= Url.Content("~/");
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(Input.Email, Input.Password, Input.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    var user = await _signInManager.UserManager.FindByEmailAsync(Input.Email);
                    var isAdmin = await _signInManager.UserManager.IsInRoleAsync(user, "Admin");

                    if (Url.IsLocalUrl(returnUrl) && returnUrl != "/")
                        return LocalRedirect(returnUrl);

                    return LocalRedirect(isAdmin ? "/pages/admin.html" : "/pages/index.html");
                }
                ModelState.AddModelError(string.Empty, "Email ou password incorretos.");
            }
            return Page();
        }
    }
}