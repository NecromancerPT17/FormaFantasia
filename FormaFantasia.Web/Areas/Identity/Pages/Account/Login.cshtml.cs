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

            // Redirecionar GET para a página de login bonita
            // exceto se já viemos de lá (para evitar loop)
            var referer = Request.Headers["Referer"].ToString();
            if (!referer.Contains("/pages/login.html") && !referer.Contains("Identity/Account/Login"))
            {
                return LocalRedirect("/pages/login.html?redirect=" + Uri.EscapeDataString(returnUrl));
            }

            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            ReturnUrl = returnUrl;
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl ??= "/pages/index.html";
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(Input.Email, Input.Password, Input.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User logged in.");

                    var user = await _signInManager.UserManager.FindByEmailAsync(Input.Email);
                    var isAdmin = await _signInManager.UserManager.IsInRoleAsync(user, "Admin");

                    // ReturnUrl válido tem prioridade
                    if (!string.IsNullOrEmpty(returnUrl) && returnUrl != "/" && Url.IsLocalUrl(returnUrl))
                        return LocalRedirect(returnUrl);

                    // Fallback por role
                    return LocalRedirect(isAdmin ? "/pages/admin.html" : "/pages/index.html");
                }
                if (result.IsLockedOut)
                    return RedirectToPage("./Lockout");

                ModelState.AddModelError(string.Empty, "Email ou password incorretos.");
                return Page();
            }

            return Page();
        }
    }
}