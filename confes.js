let userName = "";
let musicStarted = false;
let typingSpeed = 120; // slow & dalem (Starla vibe)
let pauseAfterDot = 800; // jeda setelah titik (ms)

/* ================= POPUP ================= */
function showPopup(id) {
  document.getElementById(id).classList.remove("hidden");
}

function closePopup(id) {
  document.getElementById(id).classList.add("hidden");
}

/* ================= TYPING EFFECT (PAKE JEDA TITIK) ================= */
function startTyping(id) {
  return new Promise(resolve => {
    const el = document.getElementById(id);
    let text = el.dataset.text.replace(/{nama}/g, userName);
    el.textContent = "";
    let i = 0;

    function getDelay(char, index) {
      let delay = typingSpeed;
      if (index < 5) delay += 80;
      if (char === " ") delay -= 40;
      if (char === ",") delay += 200;
      if (".!?".includes(char)) delay += 600;
      if (char === "…") delay += 900;
      delay += Math.random() * 60;
      return delay;
    }

    function type() {
      if (i < text.length) {
        const span = document.createElement("span");
        span.textContent = text[i];
        span.className = "char";
        el.appendChild(span);
        const delay = getDelay(text[i], i);
        i++;
        setTimeout(type, delay);
      } else {
        resolve(); // ✅ teks selesai
      }
    }

    type();
  });
}

/* ================= SLEEP ================= */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ================= SAVE NAME ================= */
function saveName() {
  const input = document.getElementById("nameInput").value.trim();
  if (!input) {
    alert("Jenenge diisi disik yaa 😊");
    return;
  }

  userName = input;
  closePopup("popup0");
  showPopup("popup1");
  startTyping("typing-text");
}

/* ================= VALIDASI INPUT NAMA ================= */
const nameInput = document.getElementById("nameInput");
nameInput.addEventListener("input", () => {
  let val = nameInput.value;
  const filtered = val.replace(/[^a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s.💖😂😍🤣😊😎🤍❤️🥺👉👈]/g, '');
  if (val !== filtered) nameInput.value = filtered;
});

/* ================= MUSIC ================= */
function playMusic() {
  if (musicStarted) return;
  musicStarted = true;

  const music = document.getElementById("background-music");
  music.volume = 0;
  music.play();

  let vol = 0;
  const fade = setInterval(() => {
    if (vol < 0.6) {
      vol += 0.03;
      music.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 300);
}

/* ================= START STORY (💌 CLICK) ================= */
function startStory() {
  const btn = document.getElementById("show-popup-btn");
  const loading = document.getElementById("loading");

  btn.style.opacity = "0";
  btn.style.pointerEvents = "none";

  loading.classList.remove("hidden");

  playMusic();

  setTimeout(() => {
    loading.classList.add("hidden");
    showPopup("popup0");
  }, 13000);
}

/* ================= BUTTON AKU DURUNG SIAP ================= */
let noClickCount = 0;
let noUnlocked = false;

function handleNoClick() {
  const btn = document.getElementById("btnNo");

  if (!noUnlocked) {
    noClickCount++;
    btn.textContent = `Aku durung siap (${noClickCount}/10)`;
    const x = Math.random() * 120 - 60;
    const y = Math.random() * 80 - 40;
    btn.style.transform = `translate(${x}px, ${y}px)`;

    if (noClickCount >= 10) {
      noUnlocked = true;
      btn.textContent = "ywda aku nyerah";
      btn.style.transform = "translate(0,0)";
      btn.style.background = "#ff6f91";
      btn.style.color = "white";
    }
    return;
  }

  closePopup("popup3");
  showPopup("popup6");
  startTyping("typing-text-8");
}

/* ================= WHATSAPP OTOMATIS ================= */
function openWhatsApp() {
  const phoneNumber = "6281217285500"; // ganti nomor WA tujuan
  const websiteLink = "https://contohwebsite.com"; // ganti link websitemu
  const message = `aku menerima mu dan aku mau kita seriusan, dan bukan cuma animasi sebuah web aja, berani berbuat harus berani bertanggung jawab, jan cuma bikin baper doang😏. 
link: ${websiteLink}`;
  
  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(waUrl, "_blank"); // buka WA di tab baru
}

/* ================= SHOW NEXT POPUP DENGAN WA LINK ================= */
async function showNextPopup(current, next, ...typingIds) {
  closePopup(current);
  showPopup(next);

  for (const id of typingIds) {
    await startTyping(id);
    await sleep(700);
  }

  // Jika popup berikutnya popup5, set WA link otomatis
  if (next === "popup5") {
    setWhatsAppLink();
  }
}

function openWhatsAppCode() {
  const phoneNumber = "6281217285500"; // ganti dengan nomor WA tujuan
  const secretCode = "1x3u"; // kode rahasia
  const websiteLink = "https://contohwebsite.com"; // ganti link websitemu
  
  const message = `(${secretCode})
Terimakasih telah membuka website ini, yang mau pesen web kaya gini bisa chat nomer ${phoneNumber}
link: ${websiteLink}`;
  
  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  window.open(waUrl, "_blank"); // buka WA di tab baru
}
