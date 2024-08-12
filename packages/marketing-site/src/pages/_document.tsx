import React from "react";
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const getJsonLd = () => {
  return {
    __html: `{
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "acme",
      "url" : "https://acmeapi.dev/"
    }`,
  };
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-634BX289CX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <meta property="og:site_name" content="acme" />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={getJsonLd()}
        key="website-jsonld"
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-634BX289CX`}
      />
      <body>
        <Main />
        <NextScript />
        {/* Pylon Widget */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(){var e=window;var t=document;var n=function(){n.e(arguments)};n.q=[];n.e=function(e){n.q.push(e)};e.Pylon=n;var r=function(){var e=t.createElement("script");e.setAttribute("type","text/javascript");e.setAttribute("async","true");e.setAttribute("src","https://widget.usepylon.com/widget/f9cade16-8d3c-4826-9a2a-034fad495102");var n=t.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};if(t.readyState==="complete"){r()}else if(e.addEventListener){e.addEventListener("load",r,false)}})();
            if (typeof window !== "undefined") {
              console.log('hi')
              let userEmail = localStorage.getItem("pylon_user_email");
              let userDisplayName = localStorage.getItem("pylon_user_display_name");
              if (!userEmail || !userDisplayName) {
                userDisplayName = 'anonymous' + Math.random().toString(36).substring(7);
                userEmail = userDisplayName + "@example.com";
              }
              localStorage.setItem("pylon_user_email", userEmail);
              localStorage.setItem("pylon_user_display_name", userDisplayName);
              window.pylon = {
                chat_settings: {
                  app_id: "f9cade16-8d3c-4826-9a2a-034fad495102",
                  email: userEmail,
                  name: userDisplayName,
                },
              };
            }
            `,
          }}
        />
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/21944879.js"
        ></script>
      </body>
    </Html>
  );
}
