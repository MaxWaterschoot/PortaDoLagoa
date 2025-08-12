"use client";

export function useRecaptchaV3() {
  const getToken = (action = "submit") =>
    new Promise((resolve, reject) => {
      // grecaptcha kan door adblockers delayed zijn
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) return reject(new Error("Missing site key"));

      const doExec = () => {
        if (!window.grecaptcha?.execute) {
          return reject(new Error("grecaptcha not ready"));
        }
        window.grecaptcha
          .execute(siteKey, { action })
          .then(resolve)
          .catch(reject);
      };

      // wacht tot grecaptcha ready is
      if (window.grecaptcha?.ready) {
        window.grecaptcha.ready(doExec);
      } else {
        // lichte retry in edge-cases
        const t = setInterval(() => {
          if (window.grecaptcha?.ready) {
            clearInterval(t);
            window.grecaptcha.ready(doExec);
          }
        }, 150);
        setTimeout(() => {
          clearInterval(t);
          if (!window.grecaptcha?.ready)
            reject(new Error("grecaptcha timeout"));
        }, 5000);
      }
    });

  return { getToken };
}
