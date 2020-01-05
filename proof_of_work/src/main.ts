import ProoOfWork from './ProofOfWork';

const main = async () => {
  let pow0: ProoOfWork = new ProoOfWork('Kick their assses at 4:00 AM', 0);
  let pow1: ProoOfWork = new ProoOfWork('Kick their assses at 4:00 AM', 1);
  let pow2: ProoOfWork = new ProoOfWork('Kick their assses at 4:00 AM', 2);
  let pow3: ProoOfWork = new ProoOfWork('Kick their assses at 4:00 AM', 3);
  let pow4: ProoOfWork = new ProoOfWork('Kick their assses at 4:00 AM', 4);
  let pow5: ProoOfWork = new ProoOfWork('Kick their assses at 4:00 AM', 5);
  let pow6: ProoOfWork = new ProoOfWork('Kick their assses at 4:00 AM', 6);

  await pow0.calculateProofOfWork();
  await pow1.calculateProofOfWork();
  await pow2.calculateProofOfWork();
  await pow3.calculateProofOfWork();
  await pow4.calculateProofOfWork();
  await pow5.calculateProofOfWork();
  await pow6.calculateProofOfWork();
};

main();
