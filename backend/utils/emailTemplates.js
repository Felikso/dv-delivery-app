export const MAIL_HEADER = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="./vd.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{headTitle}</title>

  <style>
    @font-face {
      font-family: Segoe;
    src:url('fonts/Segoe.eot?#') format('eot'),    
        url('fonts/Segoe.wof') format('woff'), 
        url('fonts/Segoe.ttf') format('truetype');  
    }
    .body{font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 5px;}

    .mailBox{background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgb(148, 118, 37) 50%, rgb(0, 0, 0) 100%); padding: 10px; text-align: center; border-top-right-radius: 50px; border-top-left-radius: 50px;}

    .title{color: white; margin: 0; font-size: 1rem;}

    .mailContent{background-color: rgba(228, 198, 99, 0.555); padding: .5rem 2rem; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-bottom-right-radius: 50px; border-bottom-left-radius: 50px;}

    .codeBox{text-align: center; margin: 3rem 0;}

    .code{font-size: 2em;; font-weight: bold; letter-spacing: 5px; color: rgb(148, 118, 37);}

    .messageBox{display: flex; flex-direction: column; gap: 20px;}

    .messageContent{text-align: center; align-self: flex-start; display: grid; gap: 10px; align-self: center; margin-top: 1rem 0;}

    .codeExpiried{font-weight: 700;}

    .button{font-weight: bold; background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgb(148, 118, 37) 50%, rgb(0, 0, 0) 100%); text-decoration: none; color: white; padding: 20px; border-radius: 30px; font-size: 1em;}
    
    .logo{text-align: center; line-height: .9; font-size: 2rem; margin-top: 0px; font-family: Segoe Print;}

    .dontReplay{text-align: center; margin-top: 20px; color: #888; font-size: 0.7em; }

    .itemsBox{font-size: 1rem;font-style: italic; margin: 1.5rem 0;}

    @media (max-width:750px){
      .body{font-size:.7rem;}
      .mailContent{background-color: rgba(228, 198, 99, 0.555); padding: .4rem 1rem; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-bottom-right-radius: 50px; border-bottom-left-radius: 50px;}
    
}

    </style>
</head>
<body class="body">
  <div class="mailBox">`;

export const MAIL_FOOTER = `
  </div>
  <h4 class="logo">Ventus <br>Dev</h4>
</div>
  </div>
  <div class="dontReplay">
    <p>To wiadomość automatyczna. Proszę na nią nie odpowiadać.</p>
  </div>
</body>
</html>`;

export const EMAIL_VERYFIKATION = `
<h1 class="title">Zweryfikuj swoje zamówienie</h1>
  </div>
  <div class="mailContent">
    <p>Cześć,</p>
    <p>To już ostatnie kroki do założenia konta na naszym portalu. ;)</p> 
    <p> Potwierdź je wpisując kod z obrazka pod wskazany link:</p>
    <div class="codeBox">
      <span class="code">{verificationCode}</span>
    </div>
    <div  class="messageBox">
    <div class="messageContent">
    <a href="{mailPath}" class="button">Potwierdzam</a>
    <p class="codeExpiried">Kod za godzinę wygaśnie!</p>
    <p>Pozdrowienia</p>
`;

export const WELCOME_EMAIL = `
<h1 class="title">Mail powitalny</h1>
  </div>
  <div class="mailContent">
    <p>Cześć {name},</p>
    <p>Pomyślnie udało się założyć konto. ;)</p> 
    <p>Teraz składanie zamówień będzie szybsze oraz będziesz mieć dostęp do najnowszych zniżek!</p>
    <div  class="messageBox">
    <div class="messageContent">
    <a href="{mailPath}" class="button">Odwiedź nas</a>
    <p>Pozdrowienia</p>
`;

export const PASSWORD_RESET = `
<h1 class="title">Resetowanie hasła</h1>
  </div>
  <div class="mailContent">
    <p>Cześć {name},</p>
    <p>Właśnie wysłano do nas prośbę o przypomnienie hasła do Twojego konta.</p> 
    <p>Jeśli wejdziesz w poniższy link możesz skorzystać z opcji ustawiania nowego hasła.</p>
    <div  class="messageBox">
    <div class="messageContent">
    <a href="{mailPath}" class="button">Resetuj hasło</a>
    <p>Pozdrowienia</p>
`;

export const PASSWORD_RESET_SUCCESS = `
<h1 class="title">Hasło zresetowane</h1>
  </div>
  <div class="mailContent">
    <p>Cześć {name},</p>
    <p>Właśnie udało się pomyślnie zresetować hasło do Twojego konta.</p> 
    <p>Teraz śmiało możesz na nowo się zalogować.</p>
    <div  class="messageBox">
    <div class="messageContent">
    <a href="{mailPath}" class="button">Zaloguj się</a>
    <p>Pozdrowienia</p>
`;

export const ORDER_VERYFIKATION = `
<h1 class="title">Zweryfikuj swoje zamówienie</h1>
  </div>
  <div class="mailContent">
    <p>Cześć,</p>
    <p>Udało Ci się pomyślnie złożyć zamówienie. ;)</p> 
    <div class="itemsBox">
      {itemsForMail}
    </div>
    <p> Potwierdź je wpisując kod z obrazka pod wskazany link:</p>
    <div class="codeBox">
      <span class="code">{verificationCode}</span>
    </div>
    <div  class="messageBox">
    <div class="messageContent">
    <a href="{mailPath}" class="button">Potwierdzam zamówienie</a>
    <p class="codeExpiried">Kod za godzinę wygaśnie!</p>
    <p>Pozdrowienia</p>
`;

export const ADDRESS_CHANGED = `
<h1 class="title">Zmiana adresu dostawy</h1>
  </div>
  <div class="mailContent">
    <p>Cześć {name},</p>
    <p>Domyślny adres dostawy właśnie został zmieniony.</p> 
    <p>Dziękujemy za zaufanie i złożenie kolejengo zamówienia.</p>
    <div  class="messageBox">
    <div class="messageContent">
    <a href="{mailPath}" class="button">Zamów ponownie</a>
    <p>Pozdrowienia</p>
`;

export const NEW_RABAT = `
<h1 class="title">Nowy kod rabatowy</h1>
  </div>
  <div class="mailContent">
    <p>Cześć,</p>
    <p>Właśnie przyznano Ci rabat w wysokości {rabat}%!</p> 
        <div class="codeBox">
      <span class="code">{rabatCode}</span>
    </div>
    <p>Pamiętaj, że nie jest wieczny -  wygaśnie {expires}.</p>
    <div  class="messageBox">
    <div class="messageContent">
    <a href="{mailPath}" class="button">Wykorzystaj rabat</a>
    <p>Pozdrowienia</p>
`;
