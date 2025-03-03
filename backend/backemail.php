<?php
// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs
    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $telefone = filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_STRING);
    $mensagem = filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_STRING);
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Email inválido. Por favor, tente novamente.";
        exit;
    }
    
    // Set email details
    $to = "petter.santos@outlook.com.br";
    $subject = "Contato - Portfólio";
    
    // Create email body
    $body = "Nome: " . $nome . "\r\n" .
            "Email: " . $email . "\r\n" .
            "Telefone: " . $telefone . "\r\n" .
            "Mensagem: " . $mensagem;
    
    // Set headers
    $headers = "From: noreply@seudominio.com\r\n"; // Use a domain email, not user email
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    if (mail($to, $subject, $body, $headers)) {
        // Redirect to prevent form resubmission
        header("Location: ../index.html?status=success");
        exit;
    } else {
        header("Location: ../index.html?status=error");
        exit;
    }
} else {
    // Not a POST request, redirect
    header("Location: ../index.html");
    exit;
}
?>