(() => {
   "use strict";
   const t = () => {
         const t = document.createElement("section");
         (t.id = "game"), t.classList.add("game");
         for (let e = 0; e < 15; e++)
            for (let a = 0; a < 15; a++) {
               const n = document.createElement("div");
               (n.dataset.x = a), (n.dataset.y = e), (n.className = ""), t.append(n);
            }
         return t;
      },
      e = t => {
         const { x: e, y: a } = t[t.length - 1].dataset,
            n = document.querySelector(`div[data-x='${e}'][data-y='${a}']`);
         n.classList.add("snake-body"), t.push(n);
      },
      a = (t => {
         const e = document.createElement("div");
         e.classList.add("startScreen");
         const a = document.createElement("div");
         a.classList.add("startScreen__content");
         const n = document.createElement("h1");
         n.classList.add("startScreen__tittle"), (n.textContent = "Powodzenia");
         const d = document.createElement("button");
         return d.classList.add("startScreen__button"), (d.textContent = "Zagraj"), d.addEventListener("click", t), a.append(n, d), e.append(a), e;
      })(function () {
         n.remove(),
            (n = t()),
            document.body.append(n),
            (d = (t => {
               const a = [...t.children].filter(t => t.dataset.x > 2 && t.dataset.x < 8 && t.dataset.y > 2 && t.dataset.y < 8),
                  n = Math.floor(Math.random() * a.length);
               return {
                  size: 2,
                  direction: [
                     null,
                     (() => {
                        switch (Math.floor(4 * Math.random() + 1)) {
                           case 1:
                              return "right";
                           case 2:
                              return "left";
                           case 3:
                              return "up";
                           case 4:
                              return "down";
                        }
                     })(),
                  ],
                  parts: (t => {
                     const a = [t];
                     t.classList.add("snake-head");
                     for (let t = 0; t < 2; t++) e(a);
                     return a;
                  })(a[n]),
               };
            })(n)),
            (s = []),
            (r = setInterval(y, 1e3)),
            (o = setInterval(
               () =>
                  (() => {
                     const t = d.direction[1],
                        { x: e, y: n } = i(t),
                        u = document.querySelector(`div[data-x='${e}'][data-y='${n}']`);
                     if (l(u)) return clearInterval(o), clearInterval(r), document.body.prepend(a), void setTimeout(() => a.classList.add("active"), 100);
                     u === s[0] && c(t, e, n), m(e, n), (d.direction[0] = t);
                  })(),
               100
            )),
            a.remove(),
            a.classList.remove("active");
      });
   let n = t(),
      d = null,
      s = [],
      r = null,
      o = null;
   const c = () => {
         s[0].classList.remove("food"), s.pop(), e(d.parts);
      },
      i = t => {
         let { x: e, y: a } = d.parts[0].dataset;
         switch (t) {
            case "right":
               e++;
               break;
            case "left":
               e--;
               break;
            case "up":
               a--;
               break;
            case "down":
               a++;
         }
         return { x: e, y: a };
      },
      l = t => {
         const e = d.parts.map(e => e === t);
         if (null === t || e.includes(!0)) return !0;
      },
      u = (t, e, a, n) => {
         const d = document.querySelector(`div[data-x='${a}'][data-y='${n}']`);
         return t.classList.remove(e), d.classList.add(e), d;
      },
      m = (t, e) => {
         let { x: a, y: n } = d.parts[0].dataset;
         for (let t = 0; t < d.parts.length; t++) {
            const e = d.parts[t].dataset.x,
               s = d.parts[t].dataset.y;
            (d.parts[t] = u(d.parts[t], "snake-body", a, n)), (a = e), (n = s);
         }
         d.parts[0] = u(d.parts[0], "snake-head", t, e);
      },
      p = t => {
         68 === t.keyCode && "left" !== d.direction[0] && (d.direction[1] = "right"),
            65 === t.keyCode && "right" !== d.direction[0] && (d.direction[1] = "left"),
            87 === t.keyCode && "down" !== d.direction[0] && (d.direction[1] = "up"),
            83 === t.keyCode && "up" !== d.direction[0] && (d.direction[1] = "down");
      },
      y = () => {
         if (0 === s.length) {
            const t = (t => {
               const e = [...t.children].filter(t => "" == t.className),
                  a = Math.floor(Math.random() * e.length + 1);
               if (void 0 === a) return;
               const { x: n, y: d } = e[a].dataset,
                  s = document.querySelector(`div[data-x='${n}'][data-y='${d}']`);
               return s.classList.add("food"), s;
            })(n);
            s.push(t);
         }
      };
   addEventListener("DOMContentLoaded", () => {
      document.body.prepend(a), a.classList.add("active"), window.addEventListener("keydown", p), addEventListener("DOMContentLoaded", () => {});
   });
})();
