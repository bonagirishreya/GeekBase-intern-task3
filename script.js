document.addEventListener('DOMContentLoaded', () => {
    const towers = document.querySelectorAll('.tower');
    let draggedDisk = null;

    towers.forEach(tower => {
        tower.addEventListener('dragstart', dragStart);
        tower.addEventListener('dragend', dragEnd);
        tower.addEventListener('dragover', dragOver);
        tower.addEventListener('drop', drop);
    });

    function dragStart(e) {
        if (e.target.classList.contains('disk')) {
            draggedDisk = e.target;
            setTimeout(() => {
                e.target.style.display = 'none';
            }, 0);
        }
    }

    function dragEnd(e) {
        if (draggedDisk) {
            draggedDisk.style.display = 'block';
            draggedDisk = null;
            checkWin();
        }
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        if (draggedDisk) {
            const tower = e.currentTarget;
            const topDisk = tower.querySelector('.disk:last-child');

            if (!topDisk || draggedDisk.dataset.size < topDisk.dataset.size) {
                tower.appendChild(draggedDisk);
            }
        }
    }

    function checkWin() {
        const tower3 = document.getElementById('tower3');
        const disks = tower3.querySelectorAll('.disk');
    
        // Check if tower 3 contains all 3 disks
        if (disks.length === 3) {
            // Check if they are in the correct order (from smallest to largest)
            const diskSizes = Array.from(disks).map(disk => parseInt(disk.dataset.size));
            const isValidOrder = diskSizes.every((size, index) => {
                return index === 0 || size > diskSizes[index - 1];
            });
    
            if (isValidOrder) {
                alert('Congratulations! You won the game!');
            }
        }
    }
    

    // Initialize disks on the first tower
    const tower1 = document.getElementById('tower1');
    for (let i = 3; i >= 1; i--) {
        const disk = document.createElement('div');
        disk.classList.add('disk');
        disk.draggable = true;
        disk.dataset.size = i;
        tower1.appendChild(disk);
    }
});
