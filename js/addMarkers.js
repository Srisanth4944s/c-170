AFRAME.registerComponent("create-markers", {
  
  //Add Code Here!
  init:async function(){
    var mainScene = document.querySelector("#main-scene")
    var dishes = await this.getDishes()
    dishes.map(dish=>{
    var marker = document.createElement("a-marker")
    marker.setAttribute("id",dish.id)
    marker.setAttribute("type","pattern")
    marker.setAttribute("url",dish.marker_pattern_url)
    marker.setAttribute("cursor",{
      rayOrigin:"mouse"
    })

    marker.setAttribute("markerhandler",{})
    mainScene.appendChild(marker)
    var model = document.createElement("a-entity")
    model.setAttribute("id",`model-${dish.id}`)
    model.setAttribute("position",dish.model_geometry.position)
    model.setAttribute("rotation",dish.model_geometry.rotation)
    model.setAttribute("scale",dish.model_geometry.scale)
    model.setAttribute("gltf-model",`url(${dish.model_url})`)
    model.setAttribute("gesture-handler",{})
    marker.appendChild(model)

    var mainPlain = document.createElement("a-plane")
    mainPlain.setAttribute("id",`main-plane-${dish.id}`)
    mainPlain.setAttribute("position",{x:0,y:0,z:0})
    mainPlain.setAttribute("rotation",{x:-90,y:0,z:0})
    mainPlain.setAttribute("width", 1.7)
    mainPlain.setAttribute("height", 1.5)
    marker.appendChild(mainPlain)

    var titlePlain = document.createElement("a-plane")
    titlePlain.setAttribute("id",`title-plane-${dish.id}`)
    titlePlain.setAttribute("position",{x:0,y:0.89,z:0.02})
    titlePlain.setAttribute("rotation",{x:-90,y:0,z:0})
    titlePlain.setAttribute("width", 1.69)
    titlePlain.setAttribute("height", 0.3)
    titlePlain.setAttribute("material",{color:"#f0c30f"})
    mainPlain.appendChild(titlePlain)

    var dishtitle = document.createElement("a-entity")
    dishtitle.setAttribute("id",`dish-title-${dish.id}`)
    dishtitle.setAttribute("position",{x:0,y:0,z:0.1})
    dishtitle.setAttribute("rotation",{x:-90,y:0,z:0})
    dishtitle.setAttribute("text",{
      font:"monoid",
      color:"black",
      width: 1.8,
      height: 1,
      align : "center",
      value:dish.dish_name.toUpperCase()
    })
    titlePlain.appendChild(dishtitle)

    var ingredients = document.createElement("a-entity")
    ingredients.setAttribute("id",`ingredients-${dish.id}`)
    ingredients.setAttribute("position",{x:0.3,y:0,z:0.1})
    ingredients.setAttribute("rotation",{x:-90,y:0,z:0})
    ingredients.setAttribute("text",{
      font:"monoid",
      color:"black",
      width: 2,
      align : "left",
      value:`dish.ingredients.join("\n\n")`
    })
    mainPlain.appendChild(ingredients)


  })
  },

  getDishes:async function(){
    return await firebase.firestore().collection("dishes").get().then(snap=>{
      return snap.docs.map(doc=>doc.data())
    })
  }
  
  });
