<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Conexão Local (XAMPP)
$servidor = "localhost";
$usuario  = "root";
$senha    = ""; // XAMPP por padrão é vazio
$banco    = "esup_db"; // Nome que você deu ao seu banco local

$conn = new mysqli($servidor, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die(json_encode(["erro" => "Falha na conexão"]));
}

// Recebe os dados do React (JSON)
$dados = json_decode(file_get_contents("php://input"), true);

if ($dados) {
    $nome     = $dados['nome'];
    $email    = $dados['email'];
    $telefone = $dados['telefone'];

    $stmt = $conn->prepare("INSERT INTO contatos (nome, email, telefone) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nome, $email, $telefone);

    if ($stmt->execute()) {
        echo json_encode(["status" => "sucesso"]);
    } else {
        echo json_encode(["status" => "erro", "detalhes" => $stmt->error]);
    }
}
?>