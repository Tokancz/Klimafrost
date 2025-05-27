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
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kontaktní formulář</title>
    <style>
        body {
        font-family: 'Roboto', sans-serif;
        background-color: #f2f0fe;
        display: flex;
        align-items: center;
        justify-content: center;
    }
        .boxik {
            background: #e4e1f2;
            padding: 15px;
            border-radius: 1em;
            max-width: 60%;
            transition: 0.8s;
        }
        .boxik .nadpis {
            font-size: 28px;
            color: #4d4e5b;
            text-align:center;
        }    
        .material-button {
        border: 0px rgba(0,0,0,0.25);
        padding: 0.8em;
        padding-left: 1em;
        padding-right: 1em;
        background: #555999;
        color: #ffffff;
        font-size: 18px;
        border-radius: 1.5em;
        transition: 0.5s;
        cursor: pointer;
        box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.2),
        0 4px 8px rgba(0, 0, 0, 0.2),
        0 8px 16px rgba(0, 0, 0, 0.2),
        0 16px 32px rgba(0, 0, 0, 0.2),
        0 32px 64px rgba(0, 0, 0, 0.2),
        0 0 20px rgba(0, 0, 0, 0.1);
        }
    .material-button:hover {
        background: #6a6ca5;
        color: #fdfdff;
    }
    .material-button:active {
        background: #bec2ff;
        color: #1a1b28;
    }
    input{
        height: 5rem;
        width: 40rem;
        border: 2px solid #767582;
        border-radius: 1rem;
    }
    input:focus{
        outline: none;
        border-color: #525595;
    }
    input:focus + .placeholder-text .text, :not(input[value=""]) + .placeholder-text .text {
        background-color: white;
        font-size: 1.1rem;
        color: black;
        transform: translate(0, -170%);
    }
    input:focus + .placeholder-text .text{
        border-color: #525595;
        color: #525595;
    }
    .placeholder-text{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 3px solid transparent;
        background-color: transparent;
        pointer-events: none;
        display: flex;
        align-items: center;
    }
    .text{
        font-size: 1.4rem;
        padding: 0 0.5rem;
        background-color: transparent;
        transform: translate(0);
        color: black;
        transition: transform 0.15s ease-out, font-size 0.15s ease-out, background-color 0.2s ease-out, color 0.15s ease-out;
    }
    input, .placeholder-text{
        font-size: 1.4rem;
        padding: 0 1.2rem;
    }
    textarea: 
    </style>
</head>
<body>
    <form method="POST" name="form" action="">
        <input type="text" name="jmeno" required>
        <input type="email" name="email" required>
        <input type="text" name="predmet" required>
        <textarea name="zprava" required></textarea>
        <input type="submit" class="material-button" value="Odeslat">
    </form>
</body>
</html>