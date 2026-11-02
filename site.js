const media=window.FrancisMedia||{};
const viewer=document.getElementById('image-viewer');
const viewerImage=viewer.querySelector('img');
const viewerCaption=viewer.querySelector('figcaption');
let returnFocus;
function enlarge(item,button){returnFocus=button;viewerImage.src=item.src;viewerImage.alt=item.alt;viewerCaption.textContent=item.caption;viewer.showModal();}
viewer.querySelector('.viewer-close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close();});
viewer.addEventListener('close',()=>returnFocus?.focus({preventScroll:true}));
function buildGallery(folder){
 const items=media[folder];if(!items?.length)return null;
 const gallery=document.createElement('div');gallery.className='gallery';
 const stage=document.createElement('button');stage.type='button';stage.className='gallery-stage';
 const photo=document.createElement('img');photo.loading='lazy';photo.decoding='async';
 const badge=document.createElement('span');badge.className='enlarge-label';badge.textContent='Enlarge image ↗';stage.append(photo,badge);
 const caption=document.createElement('p');caption.className='gallery-caption';caption.setAttribute('aria-live','polite');
 let active=0;
 const thumbs=document.createElement('div');thumbs.className='gallery-thumbnails';thumbs.setAttribute('role','group');thumbs.setAttribute('aria-label','Choose project image');
 function select(index){active=index;const item=items[index];photo.src=item.src;photo.alt=item.alt;photo.width=item.width;photo.height=item.height;stage.setAttribute('aria-label',`Enlarge: ${item.title}`);caption.textContent=item.caption;[...thumbs.children].forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));}
 items.forEach((item,i)=>{const button=document.createElement('button');button.type='button';button.className='gallery-thumbnail';const image=document.createElement('img');image.src=item.src;image.alt='';image.loading='lazy';const label=document.createElement('span');label.textContent=item.title;button.append(image,label);button.addEventListener('click',()=>select(i));thumbs.append(button);});
 stage.addEventListener('click',()=>enlarge(items[active],stage));gallery.append(stage,caption);if(items.length>1)gallery.append(thumbs);select(0);return gallery;
}
document.querySelectorAll('[data-photo-folder]').forEach(figure=>{const gallery=buildGallery(figure.dataset.photoFolder);if(gallery)figure.replaceChildren(gallery);});
document.querySelectorAll('[data-optional-photo]').forEach(project=>{const gallery=buildGallery(project.dataset.optionalPhoto);if(gallery){gallery.classList.add('project-media');project.append(gallery);}});
if(media.profile?.length){const portrait=document.getElementById('portrait');portrait.src=media.profile[0].src;portrait.hidden=false;document.getElementById('intro-text').hidden=true;}
