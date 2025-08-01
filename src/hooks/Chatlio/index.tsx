import { useEffect } from "react";

export function useChatlio(): void {
  const { REACT_APP_DATA_WIDGET_ID } = process.env;
  useEffect(() => {
    const chatlioScript = document?.createElement("script");
    if (!chatlioScript) return;
    chatlioScript.textContent = `window._chatlio = window._chatlio || [];
    !(function () {
      var t = document.getElementById("chatlio-widget-embed");
      if (t && window.ChatlioReact && _chatlio.init)
        return void _chatlio.init(t, ChatlioReact);
      for (
        var e = function (t) {
            return function () {
              _chatlio.push([t].concat(arguments));
            };
          },
          i = [
            "configure",
            "identify",
            "track",
            "show",
            "hide",
            "isShown",
            "isOnline",
            "page",
            "open",
            "showOrHide",
          ],
          a = 0;
        a < i.length;
        a++
      )
        _chatlio[i[a]] || (_chatlio[i[a]] = e(i[a]));
      var n = document.createElement("script"),
        c = document.getElementsByTagName("script")[0];
      (n.id = "chatlio-widget-embed"),
        (n.src = "https://w.chatlio.com/w.chatlio-widget.js"),
        (n.async = !0),
        n.setAttribute("data-embed-version", "2.0");
      n.setAttribute(
        "data-widget-id",
        "${REACT_APP_DATA_WIDGET_ID}"
      );
      c.parentNode.insertBefore(n, c);
    })();`;

    document?.body?.appendChild(chatlioScript);
    return () => {
      document?.body?.removeChild(chatlioScript);
    };
  }, []);
}
