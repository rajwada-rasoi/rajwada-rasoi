async function loadMenu(){
  const res = await fetch('menu.json');
  const data = await res.json();
  const grid = document.getElementById('menu-grid');
  // If items have categories, group them
  const grouped = {};
  (data.items||[]).forEach(item=>{
    const cat = item.category || 'Menu';
    if(!grouped[cat]) grouped[cat]=[];
    grouped[cat].push(item);
  });
  for(const cat of Object.keys(grouped)){
    const header = document.createElement('h3');
    header.textContent = cat;
    header.style.gridColumn = "1/-1";
    grid.appendChild(header);
    grouped[cat].forEach(it=>{
      const div = document.createElement('div');
      div.className='menu-item';
      const title = document.createElement('h3');
      title.innerHTML = `${it.name} <span class="price">₹${it.price||''}</span>`;
      const p = document.createElement('p');
      p.className='desc';
      p.textContent = it.description || '';
      div.appendChild(title);
      div.appendChild(p);
      grid.appendChild(div);
    });
  }
}

window.addEventListener('DOMContentLoaded', loadMenu);
