document.addEventListener("DOMContentLoaded", function () {
    // Animación de aparición
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // Carrusel de tecnologías
    const techList = [
        "HTML", "CSS", "JavaScript", "Django", "Python", "Java",
        "Spring Boot", "C", "C++", "Swagger", "MongoDB",
        "Agile Scrum", "CRM SAP", "ERP Salesforce", "Figma", "GitHub"
    ];

    let currentIndex = 0;
    const techContainer = document.getElementById("tech-slider");

    function updateTechSlider() {
        techContainer.textContent = techList[currentIndex];
        currentIndex = (currentIndex + 1) % techList.length;
    }

    setInterval(updateTechSlider, 1500);
});
