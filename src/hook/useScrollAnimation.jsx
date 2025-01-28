import { useEffect } from "react";

function useScrollAnimation(taskList) {
  useEffect(() => {
    const taskCards = document.querySelectorAll(".task-card-container");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate"); // Add animation class when in view
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is in view
    );

    taskCards.forEach((card) => {
      card.classList.remove("animate"); // Reset animation for dynamic changes
      observer.observe(card); // Observe each card
    });

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, [taskList]); // Re-run whenever the task list changes
}

export default useScrollAnimation;
