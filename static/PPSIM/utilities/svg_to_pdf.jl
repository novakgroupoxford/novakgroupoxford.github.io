searchdir(path,key) = filter(x->contains(x,key), readdir(path))

path = pwd()
key = ".svg"

files = searchdir(path, key)

for f in files
  fname = split(f, ".svg")[1]
  fpdf = fname * ".pdf"
  run(`rsvg-convert -f pdf -o $fpdf $f`)
end
