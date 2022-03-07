import { colors } from "./colors";
import { flowers } from "./flowers";
import { holidays } from "./holidays";

export type searchResults = { title: any; handle: any; }

export const requestProducts = async (searchQuery?: string, searchTags?: [string]) => {
  if (searchQuery != undefined || searchTags != undefined) {
    let searchResults: searchResults[] = [];

    const response = await fetch('http://localhost:3000/api/views/SearchProducts', {
      method: "POST",
      headers: {
        accept: 'application/hydrogen, application/json',
      },
      body: JSON.stringify({ search: searchQuery, tags: searchTags })
    }).catch((e) => {
      console.log("Client side error: ")
      console.log(e)
    })

    if (response) {
      const products = (await response.json());
      for(let i in await products) {
        const newItem = {
          title: await products[i].title,
          handle: await products[i].handle
        }

        searchResults.push(newItem)
      }
    }


    return searchResults;
  }
}

export const compareSearchFilters = (word: string) => {
  let colorsList: string[] = []
  let flowersList: string[] = []
  let holidayList: string[] = []
  let titleList: string[] = []

  //check if word is in colors
  colors.filter((item)=> {
    if(item.clientName.toLowerCase() == word){
      colorsList.push(word)
    }
  })

//check if word is in flowers
  flowers.filter((item)=> {
    if(item.singular.toLowerCase() == word){
      flowersList.push(word)
    }
    else if(item.plural.toLowerCase() == word){
      flowersList.push(word)
    }
  })

//check if word is in holidays
  holidays.filter((item)=> {
    if(item.clientName.toLowerCase() == word){
      holidayList.push(word)
    }
    else if(item.tagName.toLowerCase() == word){
      holidayList.push(word)
    }
  })

  titleList.push(word)

  return {colorsList, flowersList, holidayList, titleList}
}

