using DataFrames

all = readtable("data/fitted.csv");
substrates = readtable("data/substrates.csv");
independent = readtable("data/independent_substrates.csv");

all[:IsSubstrate] = zeros(size(all)[1])

for i in 1:size(all)[1]
  records_index = all[i,:RecordsIndex];
  if records_index in substrates[:RecordsIndex]
    all[i, :IsSubstrate] = 1
  elseif records_index in independent[:RecordsIndex]
    all[i, :IsSubstrate] = -1
  end
end

writetable("data/fitted_annotated.csv", all);
