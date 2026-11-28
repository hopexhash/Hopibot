import type { Ctx } from "./kit";

/**
 * "Open now" and today's row, worked out in the browser (on Amsterdam time: the businesses are
 * in the Netherlands and Belgium) from the opening hours the business has on record. Nothing is
 * shown when the hours cannot be read with certainty: the badge stays hidden and no row is marked.
 */

const LABELS: Record<string, { open: string; closed: string; today: string }> = {
  nl: { open: "Nu open", closed: "Nu gesloten", today: "Vandaag" },
  en: { open: "Open now", closed: "Closed now", today: "Today" },
  de: { open: "Jetzt geöffnet", closed: "Jetzt geschlossen", today: "Heute" },
  fr: { open: "Ouvert", closed: "Fermé", today: "Aujourd’hui" },
};

/** A badge the script fills in: "Open now" or "Closed now", hidden until the hours are understood. */
export function NowBadge({ c, className }: { c: Ctx; className: string }) {
  if (!c.spec.business.openingHours?.length) return null;
  const l = LABELS[c.spec.meta.lang] ?? LABELS.nl;
  return <span className={className} data-now data-open={l.open} data-closed={l.closed} data-today={l.today} hidden />;
}

/**
 * Reads every .z-hours list (rows of <dt>day(s)</dt><dd>time(s)</dd>), marks today's row with
 * .is-today and fills the [data-now] badges.
 */
export const TODAY_JS = `(function(){var d=document;
var W={zondag:0,sunday:0,sonntag:0,dimanche:0,maandag:1,monday:1,montag:1,lundi:1,dinsdag:2,tuesday:2,dienstag:2,mardi:2,woensdag:3,wednesday:3,mittwoch:3,mercredi:3,donderdag:4,thursday:4,donnerstag:4,jeudi:4,vrijdag:5,friday:5,freitag:5,vendredi:5,zaterdag:6,saturday:6,samstag:6,samedi:6};
function day(w){w=w.toLowerCase().replace(/[^a-zäöüéèû]/g,'');if(W[w]!=null)return W[w];return null}
function days(t){var p=t.toLowerCase().split(/\\s*(?:–|—|-|t\\/m|tot en met|to|bis|à|au)\\s*/);var ws=t.toLowerCase().match(/[a-zäöüéèû]+/g)||[];if(p.length===2){var a=day(p[0].trim().split(/\\s+/)[0]),b=day(p[1].trim().split(/\\s+/)[0]);if(a!=null&&b!=null){var r=[],k=a;for(var g=0;g<8;g++){r.push(k);if(k===b)break;k=(k+1)%7}return r}}var o=[];ws.forEach(function(w){var x=day(w);if(x!=null)o.push(x)});return o}
function spans(t){if(/gesloten|closed|geschlossen|ferm/i.test(t))return [];var out=[],re=/(\\d{1,2})[:.](\\d{2})\\s*(?:–|—|-|tot|to|bis|à)\\s*(\\d{1,2})[:.](\\d{2})/g,m;while((m=re.exec(t))){var s=+m[1]*60+ +m[2],e=+m[3]*60+ +m[4];if(e<=s)e+=1440;out.push([s,e])}return out.length?out:null}
var now=new Date(),today=now.getDay(),mins=now.getHours()*60+now.getMinutes(),known=false,open=false;try{var f=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Amsterdam',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now),q={};f.forEach(function(x){q[x.type]=x.value});today=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(q.weekday);mins=+q.hour*60+ +q.minute}catch(e){}
[].slice.call(d.querySelectorAll('.z-hours>div')).forEach(function(row){var dt=row.querySelector('dt'),dd=row.querySelector('dd');if(!dt||!dd)return;var ds=days(dt.textContent||'');if(ds.indexOf(today)<0)return;var sp=spans(dd.textContent||'');if(sp===null)return;row.classList.add('is-today');known=true;sp.forEach(function(x){if(mins>=x[0]&&mins<x[1])open=true})});
[].slice.call(d.querySelectorAll('[data-now]')).forEach(function(b){if(!known)return;b.textContent=b.getAttribute(open?'data-open':'data-closed');b.classList.add(open?'is-open':'is-closed');b.hidden=false})})();`;
