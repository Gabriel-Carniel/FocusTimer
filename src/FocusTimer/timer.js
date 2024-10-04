import state from "./state.js";
import * as el from "./elements.js"
import { reset } from "./actions.js";
import { kitchenTimer } from "./sounds.js";

export function countdown(){

  clearTimeout(state.countdownId)
  
  if (!state.isRunning) {
    return
  }

  let minutes = Number(el.minutes.textContent)
  let seconds = Number(el.seconds.textContent)

  if (seconds == 0){

    if (minutes == 0){
      reset()
      kitchenTimer.play()
      return
    }else {
      minutes--
      seconds = 59
    }
      
  }else {
    seconds--
  }
  
  updateDisplay(minutes, seconds)

  state.countdownId = setTimeout(() => countdown(), 1000) // Função que espera executar uma outra função depois de um certo tempo (ms)


}

export function updateDisplay(minutes, seconds) {
  minutes = minutes ?? state.minutes  // Se o minutes logo dps do igual, ou seja o que é argumento da 
                                      // Função for null, então ele pega o valor depois do ??, senão pega o valor passado.
  seconds = seconds ?? state.seconds

  el.minutes.textContent = String(minutes).padStart(2, "0")
  el.seconds.textContent = String(seconds).padStart(2, "0")
}