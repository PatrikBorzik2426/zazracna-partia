function observeDOM(){
    const elements = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('animate-fade-left','animate-duration-1000');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });

    elements.forEach(element => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', observeDOM);