package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	type Subscription struct {
		Origin  string `json:"origin"`
		Status  string `json:"status"`
		Expires string `json:"expires"`
	}
	currentSubscriptions := []Subscription{
		{"https://coverain-fe.vercel.app", "active", "2026-12-31"},
	}

	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		origin := c.GetHeader("Origin")
		for _, sub := range currentSubscriptions {
			if sub.Origin == origin {
				c.JSON(200, sub)
				return
			}
		}
		c.JSON(404, gin.H{
			"message": "Unregistered origin",
		})
	})

	r.Run(":9108")
}
