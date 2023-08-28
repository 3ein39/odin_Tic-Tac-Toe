# Tic-Tac-Toe Game

A simple implementation of the classic Tic-Tac-Toe game with minimax algorithm


 ![Tic-Tac-Toe Preview](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnFzdHplYnE5ZmJ0NmdtdDg3cmFjeTU1OWJpeWRpeThyY3gzaHh4OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TzBYk0eTLou7C03PVK/giphy.gif) 

## Table of Contents



  - [Overview](#overview)
  - [Features](#features)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [AI Implementation](#ai-implementation)

## Overview

This project is a web-based implementation of the popular Tic-Tac-Toe game. It allows two players to take turns marking the spaces in a 3x3 grid. The game includes a simple AI opponent that uses the minimax algorithm to make intelligent moves.

## Features

- Two-player gameplay mode
- AI opponent using the minimax algorithm
- Real-time status updates and win/draw notifications

## Getting Started

Try it live [here](https://3ein39.github.io/odin_Tic-Tac-Toe/)

To play the game locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/3ein39/odin_Tic-Tac-Toe.git
2. Open the index.html file in your web browser.

## Usage
1. Enter the names of the two players.
2. Click "Start" to begin the game.
3. Players take turns marking empty cells by clicking on them.
4. The game displays the current player's turn and notifies of wins or draws.
5. Click "Reset" to start a new game.

## AI Implementation

The AI opponent in this project uses the minimax algorithm to make optimal moves. The AI module contains a bestMove function that simulates possible moves and evaluates their outcomes using the minimax algorithm. The AI tries to maximize its own score while minimizing the opponent's score.
