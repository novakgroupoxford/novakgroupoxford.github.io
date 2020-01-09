using DataFrames

all = readtable("data/fitted_annotated.csv");

test_seq = all[1, :Sequence_window]

function countCharge(sequence)
  positive_charge = sum([(i == 'R' || i == 'K') ? 1 : 0 for i in sequence])
  negative_charge = sum([(i == 'D' || i == 'E') ? 1 : 0 for i in sequence])
  return positive_charge - negative_charge
end

all[:NetCharge] = zeros(size(all)[1])

for i in 1:size(all)[1]
  all[i, :NetCharge] = countCharge(all[i,:Sequence_window]);
end


writetable("data/fitted_annotated.csv", all);
