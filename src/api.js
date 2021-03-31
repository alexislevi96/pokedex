export const getPokemonData = async (url)=>{
  try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
  } catch (err) {
      console.log(err)
  }
}

export const colorPokemon = async (url)=>{
  try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data.color.name);
      return data.color.name;
  } catch (err) {
      console.log(err)
  }
}

export const colorAgradable = (color)=>{
  switch (color) {
    case 'black':
      return '#212F3D';
    case 'blue':
      return '#2980B9';
    case 'brown':
      return '#D35400';
    case 'gray':
      return '#95A5A6';
    case 'green':
      return '#2ECC71';
    case 'pink':
      return '#EC7063';
    case 'purple':
      return '#A569BD';
    case 'red':
      return '#C0392B';
    case 'white':
      return '#B3B6B7';
    case 'yellow':
      return '#F4D03F'
    default:
      return '#FEF9E7';
  }
}