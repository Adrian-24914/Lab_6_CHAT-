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
	//enviar
}

func main() {


	fmt.Println("Servidor iniciado en el puerto 8000...")	
	http.ListernAndServe("0.0.0.0:8000", nil)
}