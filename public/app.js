const canvas = document.getElementById('canvas');

function addHyperlink() {
    const newHyperlink = document.createElement('a');
    newHyperlink.innerHTML = 'Hyperlink';
    newHyperlink.style.margin = '10px';
    newHyperlink.style.fontSize = '16px';
    newHyperlink.style.color = 'blue';
    newHyperlink.setAttribute('href', ''); 
    canvas.appendChild(newHyperlink);
}

function addLabel() {
    const newLabel = document.createElement('div');
    newLabel.innerHTML = 'Label';
    newLabel.style.margin = '10px';
    newLabel.style.fontSize = '16px';
    newLabel.style.color = 'black';
    canvas.appendChild(newLabel);
}

function addButton() {
    const newButton = document.createElement('button');
    newButton.innerHTML = 'Button';
    newButton.style.margin = '10px';
    newButton.style.fontSize = '16px';
    newButton.style.color = '#DFDEDF';
    canvas.appendChild(newButton);
}

let selectedElement = null;

canvas.addEventListener('click', (event) => {
    selectedElement = event.target;
    updatePropertyEditor(selectedElement);

    if (selectedElement.tagName.toLowerCase() === 'a') {
        event.preventDefault();
    }
});

function updatePropertyEditor(element) {
    const typeSelect = document.getElementById('element-type');
    const marginTopInput = document.getElementById('margin-top');
    const marginRightInput = document.getElementById('margin-right');
    const marginBottomInput = document.getElementById('margin-bottom');
    const marginLeftInput = document.getElementById('margin-left');
    const fontSizeInput = document.getElementById('font-size');
    const colorInput = document.getElementById('color');
    const valueInput = document.getElementById('value');
    const hrefInput = document.getElementById('href');

    typeSelect.value = element.tagName.toLowerCase();
    marginTopInput.value = element.style.marginTop || '';
    marginRightInput.value = element.style.marginRight || '';
    marginBottomInput.value = element.style.marginBottom || '';
    marginLeftInput.value = element.style.marginLeft || '';
    fontSizeInput.value = element.style.fontSize || '';
    colorInput.value = element.style.color || '';
    valueInput.value = element.innerHTML || '';

    if (element.tagName.toLowerCase() === 'a') {
        hrefInput.value = element.getAttribute('href') || '';
    }
}

function updateProperties() {
    if (selectedElement) {
        const typeSelect = document.getElementById('element-type');
        const marginTopInput = document.getElementById('margin-top');
        const marginRightInput = document.getElementById('margin-right');
        const marginBottomInput = document.getElementById('margin-bottom');
        const marginLeftInput = document.getElementById('margin-left');
        const fontSizeInput = document.getElementById('font-size');
        const colorInput = document.getElementById('color');
        const valueInput = document.getElementById('value');
        const hrefInput = document.getElementById('href');

        selectedElement.style.marginTop = marginTopInput.value;
        selectedElement.style.marginRight = marginRightInput.value;
        selectedElement.style.marginBottom = marginBottomInput.value;
        selectedElement.style.marginLeft = marginLeftInput.value;
        selectedElement.style.fontSize = fontSizeInput.value;
        selectedElement.style.color = colorInput.value;
        selectedElement.innerHTML = valueInput.value;

        if (selectedElement.tagName.toLowerCase() === 'a') {
            selectedElement.setAttribute('href', hrefInput.value);
        }
    }
}

function removeElement() {
    if (selectedElement) {
        selectedElement.remove();
        clearPropertyEditor();
    }
}

function clearPropertyEditor() {
    const typeSelect = document.getElementById('element-type');
    const marginTopInput = document.getElementById('margin-top');
    const marginRightInput = document.getElementById('margin-right');
    const marginBottomInput = document.getElementById('margin-bottom');
    const marginLeftInput = document.getElementById('margin-left');
    const fontSizeInput = document.getElementById('font-size');
    const colorInput = document.getElementById('color');
    const valueInput = document.getElementById('value');
    const hrefInput = document.getElementById('href');

    typeSelect.value = '';
    marginTopInput.value = '';
    marginRightInput.value = '';
    marginBottomInput.value = '';
    marginLeftInput.value = '';
    fontSizeInput.value = '';
    colorInput.value = '';
    valueInput.value = '';
    hrefInput.value = '';
}

function saveCanvas() {
    const elements = Array.from(canvas.children).map((element) => {
        const elementType = element.tagName.toLowerCase();
        const properties = {
            marginTop: element.style.marginTop || '',
            marginRight: element.style.marginRight || '',
            marginBottom: element.style.marginBottom || '',
            marginLeft: element.style.marginLeft || '',
            fontSize: element.style.fontSize || '',
            color: element.style.color || '',
            value: element.innerHTML || '',
        };

        if (elementType === 'a') {
            properties.href = element.getAttribute('href') || '';
        }

        return {
            type: elementType,
            properties: properties,
        };
    });

    const screenJSON = {
        canvasSize: { width: 390, height: 844 },
        elements: elements,
    };

    console.log(JSON.stringify(screenJSON, null, 2));
    const jsonString = JSON.stringify(screenJSON, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ScreenJSON.json';
    link.click();
}

function drag(event, elementType, identifier) {
    event.dataTransfer.setData('text/plain', elementType);
    event.dataTransfer.setData('text/identifier', identifier);
}

canvas.addEventListener('dragover', allowDrop);
canvas.addEventListener('drop', dropElement);

function allowDrop(event) {
    event.preventDefault();
}

function dropElement(event) {
    event.preventDefault();
    const elementType = event.dataTransfer.getData('text/plain');
    const identifier = event.dataTransfer.getData('text/identifier');

    if (identifier === 'hyperlink') {
        const newHyperlink = document.createElement('a');
        newHyperlink.innerHTML = 'Hyperlink';
        newHyperlink.style.margin = '10px'; 
        newHyperlink.style.fontSize = '16px'; 
        newHyperlink.style.color = 'blue'; 
        newHyperlink.href = 'https://example.com'; 
        newHyperlink.setAttribute('draggable', 'true');
        canvas.appendChild(newHyperlink);
    } else {
        const newElement = document.createElement(elementType);
        newElement.innerHTML = elementType.charAt(0).toUpperCase() + elementType.slice(1); 
        newElement.style.margin = '10px'; 
        newElement.style.fontSize = '16px'; 
        newElement.style.color = 'black'; 
        newElement.setAttribute('draggable', 'true');
        canvas.appendChild(newElement);
    }
}

