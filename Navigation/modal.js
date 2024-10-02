const MODAL = {
    Toggle : ({e, b}) => {
        b.addEventListener("click", function(){
            e.classList.add("Show");
        });
        
        e.addEventListener('click', function(event){
            if (e !== event.target) return;
            e.classList.remove("Show");
        }, false); 

        document.querySelectorAll('button[data-modal-action="dismiss"]').forEach( dismiss => {
            dismiss.addEventListener("click", function(){
                e.classList.remove("Show");
            });
        });

        document.onkeyup = function(press) {
            if(press.key === "Escape") {
                e.classList.remove("Show");
            }
        }
    },
    Init : () => {
        document.querySelectorAll('button[data-modal-action="toggle"]').forEach( button => {
            MODAL.Toggle({
                e : document.querySelector(button.getAttribute('data-modal-target')), 
                b : button
            });
        });
    }
}

MODAL.Init();

