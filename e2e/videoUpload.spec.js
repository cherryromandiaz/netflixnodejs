describe('Video Upload', () => {
  it('should allow a user to upload a video', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[name="title"]').type('Test Video');
    cy.get('input[name="description"]').type('Test Description');
    cy.get('input[name="genre"]').type('Test Genre');
    cy.get('input[name="releaseDate"]').type('2023-01-01');
    cy.get('input[type="file"]').attachFile('sample.mp4');
    cy.get('button[type="submit"]').click();
    cy.contains('Video uploaded successfully');
  });
});
