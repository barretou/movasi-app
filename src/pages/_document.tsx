import Document, { Html, Head, Main, NextScript } from 'next/document';


//colocamos as fontes que não mudam na aplicação toda aqui em document, pois esse arquivo é 
//carregado somente uma vez. Ao contrário de App.tsx, que apesar de ter elementos que se repetem 
//em toda aplicação, a cada mudança de página esses elemento são de certa forma processados.


export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                        <link rel="shortcut icon" href="favicon.png" type="image/png" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" />
                        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap"
                            rel="stylesheet" />
                            <title>movasi app</title>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}