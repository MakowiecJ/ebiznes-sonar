package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"zadanie4/database"
	"zadanie4/handlers"
)

func main() {
	database.Connect()

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))

	e.GET("/products", handlers.GetProducts)
	e.GET("/products/:id", handlers.GetProduct)
	e.POST("/products", handlers.CreateProduct)
	e.PUT("/products/:id", handlers.UpdateProduct)
	e.DELETE("/products/:id", handlers.DeleteProduct)

	e.GET("/carts", handlers.GetCarts)
	e.GET("/carts/:cartId", handlers.GetCart)
	e.POST("/carts", handlers.CreateCart)
	e.POST("/carts/:cartId/products", handlers.AddProductToCart)
	e.POST("/carts/:cartId/pay", handlers.PayCart)

	e.GET("/categories", handlers.GetCategories)
	e.POST("/categories", handlers.CreateCategory)

	e.GET("/payments", handlers.GetPayments)

	e.Logger.Fatal(e.Start(":8080"))
}
