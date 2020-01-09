using DataFrames
using JSON

D = readtable("/home/luki/Documents/Code/Coding/mikeAnalysis_Project/vis/data/independent_substrates.csv");

ids = AbstractString[];

function getID(D,i)
  name = split(D[i, :Gene_names], ";")[1];
  pos = round(Int, D[i, :Position]);
  site = split(D[i, :Sequence], "")[pos];
  frac = split(D[i, :RecordsIndex], "_")[2];
  id = name * "_p" * site * string(pos) * "_" * frac;
  return id
end

for i in 1:size(D)[1]
  push!(ids, getID(D,i))
end

f = open("substrate_ids.json", "w");
write(f, JSON.json(ids));
close(f);
