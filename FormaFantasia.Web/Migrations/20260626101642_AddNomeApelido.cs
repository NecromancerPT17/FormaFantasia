using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FormaFantasia.Web.Migrations
{
    /// <inheritdoc />
    public partial class AddNomeApelido : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Apelido",
                table: "AspNetUsers",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Nome",
                table: "AspNetUsers",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Apelido",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Nome",
                table: "AspNetUsers");
        }
    }
}
