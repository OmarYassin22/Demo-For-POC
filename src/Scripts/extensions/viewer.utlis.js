
function getAllDbIds(viewer) {
  let instanceTree = viewer.model.getData().instanceTree;
  let allDbIdsStr = Object.keys(instanceTree.nodeAccess.dbIdToIndex);
  return allDbIdsStr.map(function (id) {
    return parseInt(id);
  });
}
function addSphere(viewer, loc) {
  let geom = new THREE.SphereGeometry(1, 100, 100);
  let material = new THREE.MeshBasicMaterial({ color: 16711760 });
  let sphereMesh = new THREE.Mesh(geom, material);
  sphereMesh.position.set(loc.x, loc.y, loc.z);
  if (!viewer.overlays.hasScene("custom-scene")) {
    viewer.overlays.addScene("custom-scene");
  }
  viewer.overlays.addMesh(sphereMesh, "custom-scene");
}
function logProperties(viewer, dbid) {
  viewer.getProperties(
    dbid,
    (props) => {
      console.log(props);
      props.properties.forEach((prop) => {
        console.log(prop.displayName + " = " + prop.displayValue);
      });
    },
    () => {
      console.log("error");
    }
  );
}
function getDbIdsByCategoryId(viewer, categoryId) {
  const ids = [];
  getAllDbIds(viewer).forEach((dbid) => {
    getProp(dbid, "CategoryId", (prop) => {
      if (prop.displayValue == categoryId) {
        ids.push(dbid);
        console.log(prop.displayValue == categoryId);
        console.log(ids.length);
      }
    });
  });
  console.log(ids.length);

  return ids;
}

function getDbIdByName(viewer, name) {
  const ids = [];
  getAllDbIds(viewer).forEach((dbid) => {
    getProp(dbid, "Name", (prop) => {
      if (prop.displayValue == name) {
        ids.push(dbid);
        console.log(prop.displayValue == name);
        console.log(ids.length);
      }
    });
  });
  console.log(ids.length);

  return ids;
}

function getProp(viewer, dbid, probName, callbackSuccess) {
  viewer.getProperties(dbid, (props) => {
    props.properties.forEach((prop) => {
      try {
        if (prop.displayName === probName) callbackSuccess(prop);
      } catch (error) { }
    });
  });
}

function activatePan() {
  viewer.toolController.setIsLocked(false);
  viewer.toolController.activateTool("pan");
}

function navigateToTop() {
  const boundingBox = viewer.model.getBoundingBox();
  const diagonal = new THREE.Vector3();
  boundingBox.getSize(diagonal);
  const size = Math.max(diagonal.x, diagonal.y, diagonal.z);
  const center = boundingBox.getCenter();
  center.y -= 1.5; // Adjust as necessary to fit the specific view
  const newPosition = new THREE.Vector3(center.x, center.y - 0.00000000000001, center.z + size); // Adjust as necessary to fit the specific view
  const newTarget = new THREE.Vector3(center.x, center.y, center.z);

  const camera = viewer.navigation.getCamera();
  camera.position.copy(newPosition);
  camera.target.copy(newTarget);

  viewer.navigation.fitBounds(true);
  viewer.impl.invalidate(true);
}

function addText(text, location, size, color) {
  let geom = new THREE.TextGeometry(text, {
    font: "monaco",
    size: size,
    height: 0.2,
    curveSegments: 12,
  });

  geom.computeBoundingBox();
  // if (color === "random") color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  let mat = new THREE.MeshBasicMaterial({
    color: color,
  });
  let mesh = new THREE.Mesh(geom, mat);
  mesh.position.x = location.x;
  mesh.position.y = location.y;
  mesh.position.z = location.z;

  viewer.overlays.addScene("custom-scene");
  viewer.overlays.addMesh(mesh, "custom-scene");
  viewer.impl.invalidate(true, true, true);
  viewer.impl.sceneUpdated(true);
}

async function findByDbIdByPropValue(viewer, propertyName, propertyValue) {
  return await viewer.model.getPropertyDb().executeUserFunction(`function userFunction (pdb) {
      let dbIds = [];
      let searchAttrId = 0;
      pdb.enumAttributes( function(i, attrDef, attrRaw) {
          if (attrDef.name === '${propertyName}') {
              searchAttrId = i;
              return true;
          }
      });
      if (!searchAttrId) {
          return null;
      }
      pdb.enumObjects((dbId) => {
          pdb.enumObjectProperties(dbId, function(attrId, valId) {
              if (attrId === searchAttrId) {
                  let value = pdb.getAttrValue(attrId, valId);
                  if (value === '${propertyValue}') {
                      dbIds.push(dbId);
                  }
                  return true;
              }
          });
      });
      return dbIds;  
  }`);
}

async function findByDbIdsByPropValues(viewer, propertyName, arrayOfValues) {
  return await viewer.model.getPropertyDb().executeUserFunction(`function userFunction (pdb) {
      let dbIds = [];
      let searchAttrId = 0;
      pdb.enumAttributes( function(i, attrDef, attrRaw) {
          if (attrDef.name === '${propertyName}') {
              searchAttrId = i;
              return true;
          }
      });
      if (!searchAttrId) {
          return null;
      }
      pdb.enumObjects((dbId) => {
          pdb.enumObjectProperties(dbId, function(attrId, valId) {
              if (attrId === searchAttrId) {
                  let value = pdb.getAttrValue(attrId, valId);
                  if ('${arrayOfValues}'.includes(value)) {
                      dbIds.push(dbId);
                  }
                  return true;
              }
          });
      });
      return dbIds;  
  }`);
}

function setSelectionAndZoom() {
  // Clear the previous selection
  this.viewer.clearSelection();

  // Add the selected dbIds to the selection set
  this.selectedIds.forEach((dbId) => {
      this.selectionSet.add(dbId);
      this.viewer.select(dbId);
  });

  // Zoom to the selected elements
  this.viewer.fitToView(this.selectionSet);
}

async function selectElementsByRevitIds(revitIds) {
  let dbidsToBeSelected = [];
  dbidsToBeSelected = await findByDbIdsByPropValues(viewerApp, "ElementId", revitIds);
  viewerApp.select(dbidsToBeSelected);
  viewerApp.utilities.fitToView(dbidsToBeSelected);
}
