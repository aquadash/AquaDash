import cv2 as cv
import urllib.request
from io import BytesIO
import numpy as np
import random as rng
from sklearn.cluster import KMeans, DBSCAN
from skimage.util import img_as_float

def kmeans_fast(features, k, num_iters=100):
    """ Use kmeans algorithm to group features into k clusters.

    This function makes use of numpy functions and broadcasting to speed up the
    first part(cluster assignment) of kmeans algorithm.

    Hints
    - You may find np.repeat and np.argmin useful

    Args:
        features: Array of N features vectors. Each row represents a feature
            vector.
        k: Number of clusters to form.
        num_iters: Maximum number of iterations the algorithm will run.

    Returns:
        assignments: Array representing cluster assignment of each point.
            (e.g. i-th point is assigned to cluster assignments[i])
    """

    N, D = features.shape

    assert N >= k, 'Number of clusters cannot be greater than number of points'

    # Randomly initalize cluster centers
    idxs = np.random.choice(N, size=k, replace=False)
    # idxs = np.floor(np.linspace(0, N-1, k)).astype(int)
    if np.floor(N/2) not in idxs:
        idxs[np.random.choice(len(idxs), size=1, replace=False)] = np.floor(N/2)
    centers = features[idxs]
    assignments = np.zeros(N)

    for n in range(num_iters):
        # Step 2: assign point to closest center
        new_assignments = np.zeros(N)
        distances = np.sqrt(((features - centers[:, np.newaxis])**2).sum(axis=2))
        new_assignments = np.argmin(distances, axis=0)
        
        # Step 3: compute new center of each cluster
        for center_k in range(k):
            cluster_i = features[new_assignments == center_k]
            centers[center_k] = np.mean(cluster_i, axis=0)
            
        # Step 4: check for differences
        if np.sum(new_assignments - assignments) == 0:
            break
        assignments = new_assignments

    return assignments

def bm0(img,n,m):
   for i in range(n):
       img = cv.blur(img, ((m, m)))
       img[img != 255] = 0
   return img

def bm1(img,n,m):
   for i in range(n):
       img = cv.blur(img, ((m, m)))
       img[img != 0] = 255
   return img

def roof_segmentation(img, highlight_color=(0, 153, 255)):
    """_summary_: Returns a colorised image of the roof segmentation

    Args:
        img (numpy.ndarray): Satellite image to segment roof off
        highlight_color (tuple, optional): Color to highlight the roof with. Defaults to (0, 153, 255).

    Returns:
        img (numpy.ndarray): Colorised image of the roof segmentation
        area_percent (float): Percentage of the highlited roof area in the image

    """
    n_k = 25

    normalized_img = img/255

    H, W, C = img.shape
    color = img_as_float(img)
    features = np.zeros((H*W, C+3))

    grid = np.dstack(np.mgrid[0:H,0:W])
    grid = 5*(grid - np.mean(grid))/np.std(grid)
    new_img = 1.2*(img - np.mean(img))/np.std(img)
    edges = cv.blur(img, (3, 3))
    edges = cv.Canny(edges, 90, 150)
    edges = cv.blur(edges, (2, 2))
    edges = 0.5*(edges - np.mean(edges))/np.std(edges)
    edges = edges.reshape([edges.shape[0], edges.shape[1], 1])

    new_image = np.dstack((new_img, grid, edges))

    features = np.reshape(new_image, [H*W, C+3], order='A')

    assignments = kmeans_fast(features, n_k, num_iters=100)

    segments = assignments.reshape((H, W))

    main_cluster = segments[int(H/2), int(W/2)]

    # rgb_segments = segments*255/(n_k - 1)

    segments[segments == main_cluster] = 255
    segments[segments != 255] = 0

    segments = cv.blur(segments,(2,2))
    segments[segments != 255] = 0
    segments = cv.blur(segments,(3,3))
    segments[segments != 255] = 0

    # segments = bm0(segments,5,2)
    # segments = bm1(segments,7,2)

    # segments = bm0(segments,3,3)
    # segments = bm1(segments,4,3)

    area_percent = np.sum(segments)/(255*H*W)
    # rgb_segments = np.stack([segments, segments, segments], axis=-1)
    # rgb_segments = np.clip(rgb_segments + img, 0, 255)
    img[segments == 255] = highlight_color

    return img, area_percent