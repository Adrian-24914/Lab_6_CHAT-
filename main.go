package main

import (
	"fmt"
	"io"
	"net/http"
)

var ChatApi = "https://chat.joelsiervas.online"

func getMessages(w http.ResponseWriter, r *http.Request) {
	resp, _ := http.Get(ChatApi + "/messages")
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "application/json")
	io.Copy(w, resp.Body)
}

func postMessages(w http.ResponseWriter, r *http.Request) {
	resp, _ := http.Post(ChatApi+"/messages", "application/json", r.Body)
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "application/json")
	io.Copy(w, resp.Body)
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("static")))

	http.HandleFunc("/api/messages", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			getMessages(w, r)
			return
		}
		if r.Method == http.MethodPost {
			postMessages(w, r)
			return
		}
	})

	fmt.Println("Servidor iniciado en el puerto 8000...")	
	http.ListenAndServe("0.0.0.0:8000", nil)
}