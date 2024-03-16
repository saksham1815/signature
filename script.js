window.onload = function() {
    const canvas = document.getElementById('signature-pad');
    const clearButton = document.getElementById('clear-btn');
    const saveButton = document.getElementById('save-btn');
    const colorPicker = document.getElementById('color-picker');
    const penSize = document.getElementById('pen-size');
    const signatureImage = document.getElementById('signature-image');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
  
    // Set up canvas
    ctx.strokeStyle = '#000';
    ctx.lineWidth = penSize.value;
  
    function draw(e) {
      if (!isDrawing) return;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
  
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });
  
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
  
    // Clear canvas
    clearButton.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  
    // Save signature as image
    saveButton.addEventListener('click', () => {
      const dataURL = canvas.toDataURL('image/png');
      signatureImage.src = dataURL;
      signatureImage.style.display = 'inline';
    });
  
    // Update pen color
    colorPicker.addEventListener('input', () => {
      ctx.strokeStyle = colorPicker.value;
    });
  
    // Update pen size
    penSize.addEventListener('change', () => {
      ctx.lineWidth = penSize.value;
    });
  };
  