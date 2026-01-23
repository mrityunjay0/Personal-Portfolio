/* =========================
   PROJECT MARQUEE + BUTTONS (FINAL)
   - Auto scroll (CSS animation)
   - Pause on hover card
   - Left/Right buttons scroll when paused
   - Mouse wheel scrolls horizontally (nice UX)
   ========================= */

const track = document.getElementById("projectTrack");
const marquee = document.getElementById("projectMarquee");
const prevBtn = document.getElementById("marqueePrev");
const nextBtn = document.getElementById("marqueeNext");

if (track && marquee) {
  // 1) Duplicate items for seamless loop (only once)
  if (!track.dataset.duplicated) {
    const items = Array.from(track.children);
    items.forEach((item) => track.appendChild(item.cloneNode(true)));
    track.dataset.duplicated = "true";
  }

  // 2) Make marquee scrollable so buttons can move it
  marquee.style.overflowX = "auto";
  marquee.style.overflowY = "hidden";
  marquee.style.scrollBehavior = "smooth"; // fallback

  // 3) Pause animation when hovering any card, resume when leaving
  marquee.addEventListener("mouseover", (e) => {
    if (e.target.closest(".project__bannerCard")) {
      track.style.animationPlayState = "paused";
    }
  });

  marquee.addEventListener("mouseout", (e) => {
    if (e.target.closest(".project__bannerCard")) {
      track.style.animationPlayState = "running";
    }
  });

  // Helper: slide by approx one card
  const getSlideAmount = () => {
    const card = track.querySelector(".project__bannerCard");
    const gap = 18; // keep same as CSS .project__track gap
    if (!card) return 600;
    return card.offsetWidth + gap;
  };

  // 4) Buttons: scroll left/right and keep paused
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      track.style.animationPlayState = "paused";
      marquee.scrollBy({ left: -getSlideAmount(), behavior: "smooth" });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      track.style.animationPlayState = "paused";
      marquee.scrollBy({ left: getSlideAmount(), behavior: "smooth" });
    });
  }

  // 5) Nice UX: Mouse wheel scrolls horizontally inside marquee
//   marquee.addEventListener(
//     "wheel",
//     (e) => {
//       // Only hijack wheel when cursor is over marquee
//       e.preventDefault();
//       marquee.scrollLeft += e.deltaY;
//       // Keep paused while user is manually scrolling
//       track.style.animationPlayState = "paused";
//     },
//     { passive: false }
//   );
}