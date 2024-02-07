export function createVoteBar(vote_average: number) {
    const rating = getRating(vote_average);
    const filledStars = "⭐".repeat(rating);
    const emptyStars = "☣️".repeat(10 - Number(rating));
    const voteBar = `${filledStars}${emptyStars}`;
    return voteBar;
}

function getRating(vote_average: number) {
    return Math.round(vote_average%10);
}
