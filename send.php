<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = htmlspecialchars($_POST['nome']);
    $email = htmlspecialchars($_POST['email']);
    $telefone = htmlspecialchars($_POST['telefone']);
    $mensagem = htmlspecialchars($_POST['mensagem']);

    // Validação simples
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "E-mail inválido.";
        exit;
    }

    $destinatario = "petter02santos@gmail.com"; 
    $assunto = "Nova mensagem do site portfólio";

    $corpo = "Nome: $nome\n";
    $corpo .= "Email: $email\n";
    $corpo .= "Telefone: $telefone\n";
    $corpo .= "Mensagem:\n$mensagem";

    $cabecalhos = "From: $email";

    if (mail($destinatario, $assunto, $corpo, $cabecalhos)) {
        echo "sucesso";
    } else {
        echo "erro";
    }
} else {
    echo "Acesso inválido.";
}
?>

