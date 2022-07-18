

export const alternateCase = (text: string, upperFirst: boolean) => {
        
    let newText = []
    
    if(upperFirst) newText = text.toLowerCase().split("");
    else newText = text.toUpperCase().split("");

    for (let i = 0; i < newText.length; i += 2) {
      newText[i] = upperFirst ? newText[i].toUpperCase() : newText[i].toLowerCase()
    }

    return newText.join("");

};

