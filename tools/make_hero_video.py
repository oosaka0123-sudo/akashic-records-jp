from PIL import Image, ImageDraw, ImageFilter
import math, random, os
W,H=1280,720
FPS=24
SECONDS=6
N=FPS*SECONDS
OUT=r'C:\Users\oosak\Documents\akashic-records-jp-review\tmp_frames'
os.makedirs(OUT, exist_ok=True)
random.seed(11)
particles=[]
for i in range(180):
    a=random.random()*math.tau
    r=random.uniform(80,520)
    z=random.uniform(.2,1.0)
    particles.append((a,r,z,random.uniform(.4,1.4)))
for f in range(N):
    t=f/N
    img=Image.new('RGB',(W,H),(5,7,12))
    glow=Image.new('RGBA',(W,H),(0,0,0,0))
    g=ImageDraw.Draw(glow)
    cx,cy=W//2,H//2
    for rr,alpha in [(300,18),(230,25),(170,40),(110,60)]:
        g.ellipse((cx-rr,cy-rr,cx+rr,cy+rr),outline=(178,146,79,alpha),width=1)
    for k in range(10):
        rr=74+k*24
        phase=t*math.tau*(.08+0.015*k)+(k*.63)
        for seg in range(18):
            a0=phase+seg*math.tau/18
            span=.055+.025*((seg+k)%3)
            a1=a0+span
            box=(cx-rr,cy-rr,cx+rr,cy+rr)
            col=(220,195,138,34+((seg+k)%4)*16)
            g.arc(box,math.degrees(a0),math.degrees(a1),fill=col,width=1+(k%3==0))
    # drifting data particles
    for a,r,z,s in particles:
        aa=a+t*math.tau*(.03+.025*z)
        pulse=.74+.26*math.sin(t*math.tau*2+a*3)
        x=cx+math.cos(aa)*r*(.64+.36*z)
        y=cy+math.sin(aa)*r*.42
        rad=max(1,int(s*z*2.2))
        al=int(30+100*z*pulse)
        g.ellipse((x-rad,y-rad,x+rad,y+rad),fill=(224,229,224,al))
    # four axial data traces
    for q in range(4):
        ang=q*math.pi/2+t*.08
        r0=40
        r1=330
        x0=cx+math.cos(ang)*r0; y0=cy+math.sin(ang)*r0
        x1=cx+math.cos(ang)*r1; y1=cy+math.sin(ang)*r1
        g.line((x0,y0,x1,y1),fill=(111,144,136,48),width=1)
    # bright central archive core
    for rr in range(74,3,-5):
        al=max(1,int((76-rr)*1.7))
        g.ellipse((cx-rr,cy-rr,cx+rr,cy+rr),outline=(226,207,165,al),width=1)
    g.ellipse((cx-8,cy-8,cx+8,cy+8),fill=(240,236,220,190))
    blur=glow.filter(ImageFilter.GaussianBlur(9))
    img=Image.alpha_composite(img.convert('RGBA'),blur)
    img=Image.alpha_composite(img,glow)
    d=ImageDraw.Draw(img)
    # horizon index marks
    for i in range(64):
        x=72+i*18
        h=4+(i%8==0)*8
        d.line((x,H-64,x,H-64-h),fill=(179,158,112,45),width=1)
    # gentle vignette
    vign=Image.new('L',(W,H),0)
    vd=ImageDraw.Draw(vign)
    vd.ellipse((-100,-260,W+100,H+260),fill=220)
    vign=vign.filter(ImageFilter.GaussianBlur(120))
    black=Image.new('RGBA',(W,H),(0,0,0,255))
    img=Image.composite(img,black,vign)
    img.convert('RGB').save(os.path.join(OUT,f'{f:04d}.jpg'),quality=88,optimize=True)
print('frames',N)
