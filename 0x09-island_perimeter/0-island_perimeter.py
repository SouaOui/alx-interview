#!/usr/bin/python3
"""

island Perimeter Problem solved using DFS and Graphs in python

"""


def island_perimeter(grid):
    """
    Function implementation for Island Calculation of Perimeter
    """
    visit = set()

    def dfs(i, j):
        if i >= len(grid) or j >= len(
                grid[0]) or i < 0 or j < 0 or grid[i][j] == 0:
            return 1
        if (i, j) in visit:
            return 0
        visit.add((i, j))
        perimeter = dfs(i, j + 1)
        perimeter += dfs(i + 1, j)
        perimeter += dfs(i - 1, j)
        perimeter += dfs(i, j - 1)
        return perimeter
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j]:
                return dfs(i, j)
