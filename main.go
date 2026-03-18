package main

import (
	"fmt"
	"io"
	"net/http"
)

func getMessages(){
	//xd
}

func postMessages(){
	//enviar
}

func main() {


	fmt.Println("Servidor iniciado en el puerto 8000...")	
	http.ListernAndServe("0.0.0.0:8000", nil)
}