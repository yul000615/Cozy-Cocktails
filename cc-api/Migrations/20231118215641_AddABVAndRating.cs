using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cc_api.Migrations
{
    /// <inheritdoc />
    public partial class AddABVAndRating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "alcohol_by_volume",
                table: "Recipe",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "average_rating",
                table: "Recipe",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "alcohol_by_volume",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "average_rating",
                table: "Recipe");
        }
    }
}
