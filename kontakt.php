<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (!empty($_POST["jmeno"]) && !empty($_POST["email"]) && !empty($_POST["predmet"]) && !empty($_POST["zprava"])) {
            
            $prijemce = "pitrdzej@gmail.com"; 
            $jmeno = htmlspecialchars($_POST["jmeno"]);
            $email = filter_var($_POST["email"]);
            $predmet_inp = htmlspecialchars($_POST["predmet"]);
            $zprava = htmlspecialchars($_POST["zprava"]);
            
            $predmet = "Kontaktní formulář: " . $predmet_inp;
            
            $headers = "From: $email\r\n";
            $headers .= "Reply-To: $email\r\n";
            $headers .= "Content-Type: text/plain; charset=utf-8\r\n";
            
            $body = "Jméno: $jmeno\n";
            $body .= "E-mail: $email\n";
            $body .= "Předmět: $predmet_inp\n\n";
            $body .= "Zpráva:\n$zprava\n";
            
            if (mail($prijemce, $predmet, $body, $headers)) {
                echo "<p style='color:green;'>Zpráva byla odeslána.</p>";
            } else {
                echo "<p style='color:red;'>Chyba při odesílání zprávy.</p>";
            }
        } else {
            echo "<p style='color:red;'>Vyplňte prosím všechna pole.</p>";
        }
}
?>
