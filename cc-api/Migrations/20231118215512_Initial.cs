using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cc_api.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            /*
            migrationBuilder.CreateTable(
                name: "Ingredient",
                columns: table => new
                {
                    name = table.Column<string>(type: "TEXT", nullable: false),
                    alcohol_by_volume = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredient", x => x.name);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    user_id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    admin = table.Column<long>(type: "INTEGER", nullable: false),
                    first_name = table.Column<string>(type: "TEXT", nullable: false),
                    last_name = table.Column<string>(type: "TEXT", nullable: false),
                    email = table.Column<string>(type: "TEXT", nullable: false),
                    password = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.user_id);
                });

            migrationBuilder.CreateTable(
                name: "Recipe",
                columns: table => new
                {
                    recipe_id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    name = table.Column<string>(type: "TEXT", nullable: false),
                    description = table.Column<string>(type: "TEXT", nullable: true),
                    user_author = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipe", x => x.recipe_id);
                    table.ForeignKey(
                        name: "FK_Recipe_User_user_author",
                        column: x => x.user_author,
                        principalTable: "User",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "Refresh_Token",
                columns: table => new
                {
                    token_id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    user_id = table.Column<long>(type: "INTEGER", nullable: false),
                    token = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Refresh_Token", x => x.token_id);
                    table.ForeignKey(
                        name: "FK_Refresh_Token_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "User_Bar_Ingredient",
                columns: table => new
                {
                    list_id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    user_id = table.Column<long>(type: "INTEGER", nullable: false),
                    ingredient_name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Bar_Ingredient", x => x.list_id);
                    table.ForeignKey(
                        name: "FK_User_Bar_Ingredient_Ingredient_ingredient_name",
                        column: x => x.ingredient_name,
                        principalTable: "Ingredient",
                        principalColumn: "name");
                    table.ForeignKey(
                        name: "FK_User_Bar_Ingredient_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "Recipe_Ingredient",
                columns: table => new
                {
                    list_id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    quantity = table.Column<double>(type: "REAL", nullable: false),
                    quantity_description = table.Column<string>(type: "TEXT", nullable: false),
                    recipe_id = table.Column<long>(type: "INTEGER", nullable: false),
                    ingredient_name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipe_Ingredient", x => x.list_id);
                    table.ForeignKey(
                        name: "FK_Recipe_Ingredient_Ingredient_ingredient_name",
                        column: x => x.ingredient_name,
                        principalTable: "Ingredient",
                        principalColumn: "name");
                    table.ForeignKey(
                        name: "FK_Recipe_Ingredient_Recipe_recipe_id",
                        column: x => x.recipe_id,
                        principalTable: "Recipe",
                        principalColumn: "recipe_id");
                });

            migrationBuilder.CreateTable(
                name: "Report",
                columns: table => new
                {
                    report_id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    issue = table.Column<string>(type: "TEXT", nullable: false),
                    recipe_id = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Report", x => x.report_id);
                    table.ForeignKey(
                        name: "FK_Report_Recipe_recipe_id",
                        column: x => x.recipe_id,
                        principalTable: "Recipe",
                        principalColumn: "recipe_id");
                });

            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    review_id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    rating = table.Column<double>(type: "REAL", nullable: false),
                    feedback = table.Column<string>(type: "TEXT", nullable: false),
                    date_time = table.Column<string>(type: "TEXT", nullable: false),
                    recipe_id = table.Column<long>(type: "INTEGER", nullable: false),
                    user_id = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Review", x => x.review_id);
                    table.ForeignKey(
                        name: "FK_Review_Recipe_recipe_id",
                        column: x => x.recipe_id,
                        principalTable: "Recipe",
                        principalColumn: "recipe_id");
                    table.ForeignKey(
                        name: "FK_Review_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "User_Favorite_Recipe",
                columns: table => new
                {
                    list_id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    user_id = table.Column<long>(type: "INTEGER", nullable: false),
                    recipe_id = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Favorite_Recipe", x => x.list_id);
                    table.ForeignKey(
                        name: "FK_User_Favorite_Recipe_Recipe_recipe_id",
                        column: x => x.recipe_id,
                        principalTable: "Recipe",
                        principalColumn: "recipe_id");
                    table.ForeignKey(
                        name: "FK_User_Favorite_Recipe_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_user_author",
                table: "Recipe",
                column: "user_author");

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_Ingredient_ingredient_name",
                table: "Recipe_Ingredient",
                column: "ingredient_name");

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_Ingredient_recipe_id",
                table: "Recipe_Ingredient",
                column: "recipe_id");

            migrationBuilder.CreateIndex(
                name: "IX_Refresh_Token_user_id",
                table: "Refresh_Token",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_Report_recipe_id",
                table: "Report",
                column: "recipe_id");

            migrationBuilder.CreateIndex(
                name: "IX_Review_recipe_id",
                table: "Review",
                column: "recipe_id");

            migrationBuilder.CreateIndex(
                name: "IX_Review_user_id",
                table: "Review",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_User_email",
                table: "User",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_Bar_Ingredient_ingredient_name",
                table: "User_Bar_Ingredient",
                column: "ingredient_name");

            migrationBuilder.CreateIndex(
                name: "IX_User_Bar_Ingredient_user_id",
                table: "User_Bar_Ingredient",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_User_Favorite_Recipe_recipe_id",
                table: "User_Favorite_Recipe",
                column: "recipe_id");

            migrationBuilder.CreateIndex(
                name: "IX_User_Favorite_Recipe_user_id",
                table: "User_Favorite_Recipe",
                column: "user_id");
            */
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            /*
            migrationBuilder.DropTable(
                name: "Recipe_Ingredient");

            migrationBuilder.DropTable(
                name: "Refresh_Token");

            migrationBuilder.DropTable(
                name: "Report");

            migrationBuilder.DropTable(
                name: "Review");

            migrationBuilder.DropTable(
                name: "User_Bar_Ingredient");

            migrationBuilder.DropTable(
                name: "User_Favorite_Recipe");

            migrationBuilder.DropTable(
                name: "Ingredient");

            migrationBuilder.DropTable(
                name: "Recipe");

            migrationBuilder.DropTable(
                name: "User");
            */
        }
    }
}
