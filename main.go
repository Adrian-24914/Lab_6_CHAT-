package main

import (
	"fmt"
	"io"
	"net/http"
)

var ChatApi = "https://chat.joelsiervas.online"

func getMessages(){
	resp, _ := http.Get(ChatApi + "/messages")
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "application/json")
	io.Copy(w, resp.Body)
}

func postMessages(){
	resp, _ := http.Post(ChatApi+"/messages", "application/json", r.Body)
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "application/json")
	io.Copy(w, resp.Body)
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("static")))

	fmt.Println("Servidor iniciado en el puerto 8000...")	
	http.ListenAndServe("0.0.0.0:8000", nil)
}